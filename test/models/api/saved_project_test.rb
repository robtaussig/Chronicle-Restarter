# == Schema Information
#
# Table name: api_saved_projects
#
#  id                 :integer          not null, primary key
#  title              :string
#  content            :text
#  author_id          :integer
#  category_id        :integer
#  goal               :integer
#  project_img_urls   :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  blurb              :text
#  duration           :integer
#  location           :string
#  risks              :text
#  image              :string
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

require 'test_helper'

class Api::SavedProjectTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
