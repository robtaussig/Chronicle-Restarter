class Api::Reward < ActiveRecord::Base
  validates :project_id, presence: true
  belongs_to :saved_project, class_name: 'SavedProject', foreign_key: 'project_id'
  has_one :project, through: :saved_project
  has_many :fundings
end
