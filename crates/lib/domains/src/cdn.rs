//! Media CDN domains.

use crate::{Domain, domain};

/// Production media CDN. Serves both FakeYou and Storyteller media.
pub const FAKEYOU_CDN: Domain = domain!("cdn-2.fakeyou.com");

/// Storyteller Studio static assets.
pub const STORYTELLER_CDN: Domain = domain!("cdn.storyteller.ai");

/// Development media bucket (Cloudflare R2 public bucket URL).
pub const DEVELOPMENT_CDN: Domain = domain!("pub-c8a4a5bdbdb048f286b77bdf9f786ff2.r2.dev");

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn fakeyou_cdn() {
    assert_eq!(FAKEYOU_CDN.bare_domain(), "cdn-2.fakeyou.com");
    assert_eq!(FAKEYOU_CDN.https_link_without_path(), "https://cdn-2.fakeyou.com");
    assert_eq!(FAKEYOU_CDN.https_link_with_root_path(), "https://cdn-2.fakeyou.com/");
  }

  #[test]
  fn storyteller_cdn() {
    assert_eq!(STORYTELLER_CDN.https_link_without_path(), "https://cdn.storyteller.ai");
  }

  #[test]
  fn development_cdn() {
    assert_eq!(DEVELOPMENT_CDN.https_link_without_path(), "https://pub-c8a4a5bdbdb048f286b77bdf9f786ff2.r2.dev");
  }

  #[cfg(feature = "url")]
  #[test]
  fn cdn_urls() {
    assert_eq!(FAKEYOU_CDN.https_url().as_str(), "https://cdn-2.fakeyou.com/");
    assert_eq!(DEVELOPMENT_CDN.https_url().as_str(), "https://pub-c8a4a5bdbdb048f286b77bdf9f786ff2.r2.dev/");
  }
}
