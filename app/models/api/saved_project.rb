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

class Api::SavedProject < ActiveRecord::Base
  has_attached_file :image, default_url: "default_pic.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  belongs_to :author, class_name: 'User', foreign_key: 'author_id'
  has_many :rewards, foreign_key: 'project_id'
  has_one :project, foreign_key: 'saved_project_id'

end
