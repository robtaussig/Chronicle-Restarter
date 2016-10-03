# == Schema Information
#
# Table name: api_rewards
#
#  id                 :integer          not null, primary key
#  project_id         :integer          not null
#  title              :string
#  amount             :integer
#  description        :string
#  quantity           :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  project_reward_key :integer
#

class Api::Reward < ActiveRecord::Base
  validates :project_id, presence: true
  belongs_to :saved_project, class_name: 'SavedProject', foreign_key: 'project_id'
  has_one :project, through: :saved_project
  has_many :fundings
end
