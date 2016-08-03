# == Schema Information
#
# Table name: api_projects
#
#  id               :integer          not null, primary key
#  title            :string           not null
#  content          :text
#  author_id        :integer          not null
#  category_id      :integer
#  goal             :integer
#  project_img_urls :string
#  project_due_date :date
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Api::Project < ActiveRecord::Base

  validates :title, :author_id, presence: true

  belongs_to :author

end
