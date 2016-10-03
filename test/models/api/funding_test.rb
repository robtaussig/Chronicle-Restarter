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

require 'test_helper'

class Api::FundingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
