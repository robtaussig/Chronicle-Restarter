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

require 'test_helper'

class Api::RewardTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
