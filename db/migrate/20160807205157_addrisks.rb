class Addrisks < ActiveRecord::Migration
  def change
    add_column :api_saved_projects, :risks, :text
  end
end
