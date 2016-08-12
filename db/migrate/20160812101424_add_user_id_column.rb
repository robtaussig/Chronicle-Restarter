class AddUserIdColumn < ActiveRecord::Migration
  def change
    add_column :api_fundings, :user_id, :integer
    add_index :api_fundings, :user_id
  end
end
