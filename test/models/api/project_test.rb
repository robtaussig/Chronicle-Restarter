# == Schema Information
#
# Table name: api_projects
#
#  id                           :integer          not null, primary key
#  title                        :string           not null
#  content                      :text
#  author_id                    :integer          not null
#  category_id                  :integer
#  goal                         :integer
#  project_img_urls             :string
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#  blurb                        :text
#  duration                     :integer
#  location                     :string
#  saved_project_id             :integer
#  author_full_name             :string
#  website                      :string
#  risks                        :text
#  image                        :string
#  project_picture_file_name    :string
#  project_picture_content_type :string
#  project_picture_file_size    :integer
#  project_picture_updated_at   :datetime
#  image_file_name              :string
#  image_content_type           :string
#  image_file_size              :integer
#  image_updated_at             :datetime
#

require 'test_helper'

class Api::ProjectTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
