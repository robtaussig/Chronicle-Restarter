class CreateApiRewards < ActiveRecord::Migration
  def change
    create_table :api_rewards do |t|
      t.integer :project_id, null: false
      t.string :title
      t.integer :amount
      t.string :description
      t.integer :quantity

      t.timestamps null: false
    end
    add_index :api_rewards, :project_id
  end
end
