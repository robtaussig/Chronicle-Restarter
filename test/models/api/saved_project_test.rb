# == Schema Information
#
# Table name: api_saved_projects
#
#  id               :integer          not null, primary key
#  title            :string
#  content          :text
#  author_id        :integer
#  category_id      :integer
#  goal             :integer
#  project_img_urls :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  blurb            :text
#  duration         :integer
#  location         :string
#

require 'test_helper'

class Api::SavedProjectTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
