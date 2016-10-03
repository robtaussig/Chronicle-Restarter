# == Schema Information
#
# Table name: api_fundings
#
#  id         :integer          not null, primary key
#  reward_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#

class Api::Funding < ActiveRecord::Base
  validates :reward_id, presence: true
  belongs_to :reward
  has_one :project, through: :reward
  belongs_to :user
end
