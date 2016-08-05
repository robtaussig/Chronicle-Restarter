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
#  project_due_date :date
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Api::SavedProject < ActiveRecord::Base

  validates :author_id, presence: true

  belongs_to :author, class_name: 'User', foreign_key: 'author_id'

end
