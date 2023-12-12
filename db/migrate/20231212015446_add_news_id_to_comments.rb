class AddNewsIdToComments < ActiveRecord::Migration[6.0]
  def change
    add_reference :comments, :news, null: false, foreign_key: true
  end
end
