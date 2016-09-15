# Load the Rails application.
require File.expand_path('../application', __FILE__)
require 'rack-cache'

Rails.application.configure do
  config.middleware.use Rack::Cache,
     verbose:     true,
     metastore:   'file:/var/cache/rack/meta',
     entitystore: 'file:/var/cache/rack/body'
end
# Initialize the Rails application.
Rails.application.initialize!
