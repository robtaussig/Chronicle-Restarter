class Remove < ActiveRecord::Migration
  def change
    remove_index :api_projects, :title
  end
end
