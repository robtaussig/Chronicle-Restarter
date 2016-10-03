class CreateApiComments < ActiveRecord::Migration
  def change
    create_table :api_comments do |t|
      t.string :body, null: false
      t.string :title
      t.integer :user_id
      t.integer :campaign_id, null: false

      t.timestamps null: false
    end
    add_index :api_comments, :campaign_id
  end
end
