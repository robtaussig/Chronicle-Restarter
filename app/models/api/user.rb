class Api::User < ActiveRecord::Base

  validates :username, :password_digest, :session_token, :email, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  attr_reader :password
  after_initialize :ensure_session_token

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
