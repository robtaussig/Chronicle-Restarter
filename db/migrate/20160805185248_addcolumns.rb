class Addcolumns < ActiveRecord::Migration
  def change
    remove_column :api_projects, :project_due_date
    remove_column :api_saved_projects, :project_due_date
    add_column :api_projects, :blurb, :text
    add_column :api_projects, :duration, :integer
    add_column :api_projects, :location, :string
    add_column :api_saved_projects, :blurb, :text
    add_column :api_saved_projects, :duration, :integer
    add_column :api_saved_projects, :location, :string

  end
end
