use actix_cors::Cors;
use crate::util::netlify_branch_domain_matches::netlify_branch_domain_matches;
use domains::artcraft::ARTCRAFT_AI;
use domains::artcraft::ARTCRAFT_AI_WWW;
use domains::artcraft::ARTCRAFT_WEBSITE;
use domains::artcraft::ARTCRAFT_WEBSITE_WWW;

pub fn add_artcraft_website(cors: Cors, _is_production: bool) -> Cors {
  cors
      // Actual domains
      .allowed_origin(ARTCRAFT_WEBSITE.https_link_without_path())
      .allowed_origin(ARTCRAFT_WEBSITE_WWW.https_link_without_path())
      // Hypothetical domains
      .allowed_origin(ARTCRAFT_AI.https_link_without_path())
      .allowed_origin(ARTCRAFT_AI_WWW.https_link_without_path())
      // Development against production
      .allowed_origin("http://localhost:4200")
      .allowed_origin("http://localhost:4201")
      .allowed_origin("http://localhost:4202")
      // Netlify project
      .allowed_origin_fn(|origin, _req_head| {
        netlify_branch_domain_matches(origin, "artcraft-website.netlify.app")
      })
}
