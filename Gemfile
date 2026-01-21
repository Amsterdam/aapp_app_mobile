source "https://rubygems.org"

ruby "~> " + File.read(File.join(__dir__, ".ruby-version")).strip.split(".").first(2).join(".")

gem "openssl", "~> 3.3"
gem "fastlane", "2.231.1"

group :iosAppBuildDependencies do
  # Exclude problematic versions of cocoapods and activesupport that causes build failures.
  gem 'cocoapods', '>= 1.13', '!= 1.15.0', '!= 1.15.1'
  gem 'activesupport', '>= 6.1.7.5', '!= 7.1.0'
  gem 'xcodeproj', '< 1.26.0'
  gem 'concurrent-ruby', '< 1.3.4' 
  # Ruby 3.4.0 has removed some libraries from the standard library.
  gem 'bigdecimal'
  gem 'logger'
  gem 'benchmark'
  gem 'mutex_m'
end