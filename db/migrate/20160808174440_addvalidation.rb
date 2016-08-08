class Addvalidation < ActiveRecord::Migration
  def change
    add_column :api_users, :verified, :boolean, default: false
  end
end
