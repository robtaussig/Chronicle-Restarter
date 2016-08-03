# == Schema Information
#
# Table name: api_sessions
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Api::Session < ActiveRecord::Base
end
