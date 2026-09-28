use actix_cors::Cors;
use crate::util::netlify_branch_domain_matches::netlify_branch_domain_matches;
use domains::artcraft::ARTCRAFT_2D;
use domains::storyteller::STORYTELLER_2D;

pub fn add_artcraft_2d(cors: Cors, _is_production: bool) -> Cors {
  cors
      // Hypothetical domains
      .allowed_origin(STORYTELLER_2D.https_link_without_path())
      .allowed_origin(ARTCRAFT_2D.https_link_without_path())
      // Netlify project
      .allowed_origin_fn(|origin, _req_head| {
        netlify_branch_domain_matches(origin, "storyteller-2d.netlify.app")
      })
      // Tauri localhost (2D engine, first three ports)
      .allowed_origin("http://localhost:5741")
      .allowed_origin("http://localhost:5742") // If already started
      .allowed_origin("http://localhost:5743") // If already started
}
