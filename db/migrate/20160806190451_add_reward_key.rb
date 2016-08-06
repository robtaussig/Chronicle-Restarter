class AddRewardKey < ActiveRecord::Migration
  def change
    add_column :api_rewards, :project_reward_key, :integer
  end
end
