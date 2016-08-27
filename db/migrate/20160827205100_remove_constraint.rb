class RemoveConstraint < ActiveRecord::Migration
  def change
    remove_index :api_users, :username
    add_index :api_users, :username
  end
end
