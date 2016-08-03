# == Schema Information
#
# Table name: api_users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  email           :string
#  pic_url         :string
#  home            :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'test_helper'

class Api::UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
