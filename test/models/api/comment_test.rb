# == Schema Information
#
# Table name: api_comments
#
#  id          :integer          not null, primary key
#  body        :string           not null
#  title       :string
#  user_id     :integer
#  campaign_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class Api::CommentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
