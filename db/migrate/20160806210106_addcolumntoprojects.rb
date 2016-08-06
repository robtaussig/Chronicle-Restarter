class Addcolumntoprojects < ActiveRecord::Migration
  def change
    add_column :api_projects, :saved_project_id, :integer
  end
end
