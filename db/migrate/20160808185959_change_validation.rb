class ChangeValidation < ActiveRecord::Migration
  def change
    remove_column :api_users, :verified
    remove_column :api_users, :verification_status
    add_column :api_users, :verified, :string
    add_column :api_users, :verification_status, :string
  end
end
