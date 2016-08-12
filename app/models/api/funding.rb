class Api::Funding < ActiveRecord::Base
  validates :reward_id, presence: true
  belongs_to :reward
  has_one :project, through: :reward
end
