class Comment < ApplicationRecord
  belongs_to :news

  # Validations
  validates :comment, :username, presence: true
end
