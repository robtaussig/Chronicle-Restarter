class AddAttachmentImageToApiSavedProjects < ActiveRecord::Migration
  def self.up
    change_table :api_saved_projects do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :api_saved_projects, :image
  end
end
