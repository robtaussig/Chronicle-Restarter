class ChangeImgUrlName < ActiveRecord::Migration
  def change
    add_column :api_saved_projects, :image, :string
    add_column :api_projects, :image, :string
  end
end
