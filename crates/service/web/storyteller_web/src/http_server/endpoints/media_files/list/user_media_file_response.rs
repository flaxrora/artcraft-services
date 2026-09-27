use bucket_paths::legacy::typified_paths::public::media_files::bucket_file_path::MediaFileBucketPath;
use enums::by_table::media_files::media_file_type::MediaFileType;
use mysql_queries::queries::media_files::list::user_media_file_list_item::MediaFileListItem;
use server_environment::ServerEnvironment;

use super::list_media_files_for_user_handler::MediaFileForUserListItem;
use crate::http_server::common_responses::media::media_domain::MediaDomain;
use crate::http_server::common_responses::media::media_file_cover_image_details::MediaFileCoverImageDetails;
use crate::http_server::common_responses::media::media_links_builder::MediaLinksBuilder;
use crate::http_server::common_responses::media_file_origin_details::MediaFileOriginDetails;
use crate::http_server::common_responses::simple_entity_stats::SimpleEntityStats;
use crate::http_server::web_utils::bucket_urls::bucket_url_string_from_media_path::bucket_url_string_from_media_path;

pub(super) struct UserMediaFileResponseArgs {
  pub records: Vec<MediaFileListItem>,
  pub is_allowed_studio_access: bool,
  pub media_domain: MediaDomain,
  pub server_environment: ServerEnvironment,
}

/// Shared media-item representation; pagination contracts remain versioned.
pub(super) fn build_user_media_file_response(args: UserMediaFileResponseArgs) -> Vec<MediaFileForUserListItem> {
  let UserMediaFileResponseArgs {
    records,
    is_allowed_studio_access,
    media_domain,
    server_environment,
  } = args;
  records
    .into_iter()
    .filter(|record| {
      if is_allowed_studio_access {
        return true;
      }
      // Don't allow access to certain media types.
      match record.media_type {
        MediaFileType::Bvh
        | MediaFileType::Fbx
        | MediaFileType::Glb
        | MediaFileType::Gltf
        | MediaFileType::SceneRon => return false,
        _ => {}
      }
      // // Don't allow access to certain products.
      // match record.origin_product_category {
      //   MediaFileOriginProductCategory::VideoFilter |
      //   MediaFileOriginProductCategory::Mocap |
      //   MediaFileOriginProductCategory::Workflow => return false,
      //   _ => {},
      // }
      true
    })
    .map(|record| {
      let public_bucket_path = MediaFileBucketPath::from_object_hash(
        &record.public_bucket_directory_hash,
        record.maybe_public_bucket_prefix.as_deref(),
        record.maybe_public_bucket_extension.as_deref(),
      );
      MediaFileForUserListItem {
        token: record.token.clone(),
        media_class: record.media_class,
        media_type: record.media_type,
        maybe_engine_category: record.maybe_engine_category,
        maybe_animation_type: record.maybe_animation_type,
        origin: MediaFileOriginDetails::from_db_fields_str(
          record.origin_category,
          record.origin_product_category,
          record.maybe_origin_model_type,
          record.maybe_origin_model_token.as_deref(),
          record.maybe_origin_model_title.as_deref(),
        ),
        origin_category: record.origin_category,
        origin_product_category: record.origin_product_category,
        maybe_origin_model_type: record.maybe_origin_model_type,
        maybe_origin_model_token: record.maybe_origin_model_token,
        media_links: MediaLinksBuilder::from_media_path_and_env(media_domain, server_environment, &public_bucket_path),
        maybe_prompt_token: record.maybe_prompt_token,
        public_bucket_path: public_bucket_path.get_full_object_path_str().to_string(),
        public_bucket_url: bucket_url_string_from_media_path(&public_bucket_path, media_domain, server_environment),
        cover_image: MediaFileCoverImageDetails::from_optional_db_fields(
          &record.token,
          media_domain,
          server_environment,
          record.maybe_file_cover_image_public_bucket_hash.as_deref(),
          record.maybe_file_cover_image_public_bucket_prefix.as_deref(),
          record.maybe_file_cover_image_public_bucket_extension.as_deref(),
        ),
        creator_set_visibility: record.creator_set_visibility,
        is_user_upload: record.is_user_upload,
        is_intermediate_system_file: record.is_intermediate_system_file,
        maybe_title: record.maybe_title,
        maybe_text_transcript: record.maybe_text_transcript,
        maybe_style_name: record
          .maybe_prompt_args
          .as_ref()
          .and_then(|args| args.style_name.as_ref())
          .and_then(|style| style.to_style_name()),
        maybe_duration_millis: record.maybe_duration_millis,
        stats: SimpleEntityStats {
          positive_rating_count: record.maybe_ratings_positive_count.unwrap_or(0),
          bookmark_count: record.maybe_bookmark_count.unwrap_or(0),
        },
        created_at: record.created_at,
        updated_at: record.updated_at,
      }
    })
    .collect::<Vec<_>>()
}
