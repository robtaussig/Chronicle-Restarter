class AddAttachmentImageToApiProjects < ActiveRecord::Migration
  def self.up
    change_table :api_projects do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :api_projects, :image
  end
end
