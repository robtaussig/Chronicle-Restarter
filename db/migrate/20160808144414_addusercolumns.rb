class Addusercolumns < ActiveRecord::Migration
  def change
    remove_column :api_users, :home
    add_column :api_users, :location, :string
    add_column :api_users, :biography, :text
    add_column :api_users, :website, :string
  end
end
