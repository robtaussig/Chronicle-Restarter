class AddFullName < ActiveRecord::Migration
  def change
    add_column :api_users, :full_name, :string
  end
end
