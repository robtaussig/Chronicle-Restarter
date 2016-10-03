# == Schema Information
#
# Table name: api_users
#
#  id                  :integer          not null, primary key
#  username            :string           not null
#  password_digest     :string           not null
#  session_token       :string           not null
#  email               :string
#  pic_url             :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  location            :string
#  biography           :text
#  website             :string
#  full_name           :string
#  verified            :string
#  verification_status :string
#  photo_file_name     :string
#  photo_content_type  :string
#  photo_file_size     :integer
#  photo_updated_at    :datetime
#  image_file_name     :string
#  image_content_type  :string
#  image_file_size     :integer
#  image_updated_at    :datetime
#

require 'test_helper'

class Api::UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
