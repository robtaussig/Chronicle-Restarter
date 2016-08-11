class AddProjectInfo < ActiveRecord::Migration
  def change
    add_column :api_projects, :author_full_name, :string
    add_column :api_projects, :website, :string
    add_column :api_projects, :risks, :text
  end
    add_index :api_projects, :location
end
