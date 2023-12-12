class News < ApplicationRecord

  # Validaciones
  validates :headline, :byline, :author, :body, :picture_url, presence: true
end
