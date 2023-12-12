class News < ApplicationRecord
  has_many :comments

  # Validations
  validates :headline, :byline, :author, :body, :picture_url, presence: true
end
