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

class Api::User < ActiveRecord::Base

  has_attached_file :image, default_url: "default_pic.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  validates :username, :password_digest, :session_token, :email, presence: true
  validates :email, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}
  attr_reader :password
  after_initialize :ensure_session_token


  has_many :saved_projects, foreign_key: 'author_id'
  has_many :projects, foreign_key: 'author_id'
  has_many :fundings
  has_many :funded_projects, through: :fundings, source: :project
  has_many :comments, foreign_key: 'author_id'

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def self.find_by_credentials(email, password)
    user = Api::User.find_by(email: email)
    return user if user && user.is_password?(password)
    nil
  end

  def reset_session_token
    self.session_token = Api::User.generate_session_token
    self.save!
    return self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  private

  def ensure_session_token
    self.session_token ||= Api::User.generate_session_token
  end


end
