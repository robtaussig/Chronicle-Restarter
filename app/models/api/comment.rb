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

class Api::Comment < ActiveRecord::Base
  belongs_to :author, class_name: 'User', foreign_key: 'user_id'
  belongs_to :campaign, class_name: 'Project', foreign_key: 'campaign_id'
  validates :body, :user_id, presence: true
end
