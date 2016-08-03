class CreateApiSessions < ActiveRecord::Migration
  def change
    create_table :api_sessions do |t|

      t.timestamps null: false
    end
  end
end
