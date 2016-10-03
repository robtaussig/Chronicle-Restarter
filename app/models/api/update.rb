# == Schema Information
#
# Table name: api_updates
#
#  id          :integer          not null, primary key
#  campaign_id :integer          not null
#  body        :string           not null
#  title       :string           not null
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Api::Update < ActiveRecord::Base
  belongs_to :author, class_name: 'User', foreign_key: 'user_id'
  belongs_to :campaign, class_name: 'Project', foreign_key: 'campaign_id'
  validates :body, :user_id, :title, :campaign_id, presence: true
end
