class AddAttachmentImageToApiApiUsers < ActiveRecord::Migration
  def self.up
    change_table :api_users do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :api_users, :image
  end
end
