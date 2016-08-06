class Api::Reward < ActiveRecord::Base
  belongs_to :saved_project, class_name: 'SavedProject', foreign_key: 'project_id'
end
