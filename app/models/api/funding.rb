class Api::Funding < ActiveRecord::Base
  validates :reward_id, presence: true
  belongs_to :reward
end
