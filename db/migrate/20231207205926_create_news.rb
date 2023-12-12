class CreateNews < ActiveRecord::Migration[6.0]
  def change
    create_table :news do |t|
      t.string :headline
      t.string :byline
      t.string :author
      t.text :body
      t.string :picture_url

      t.timestamps
    end
  end
end
