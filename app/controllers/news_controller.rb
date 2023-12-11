class NewsController < ApplicationController
  def index
    @news_list = News.all
  end

  def create
    news = News.new(news_params)
    if news.valid?
      news.save!
      flash[:info] = "Se ha agregado la noticia"
      redirect_to news_index_url
    else
      flash[:error] = "Error. No se ha guardado la noticia. Verifique los datos ingresados."
      redirect_to news_index_url
    end
  end

  def new
    @news = News.new
  end

  def show
    @news = News.find(params[:id])
    create_date = @news.created_at
    @date = number_date(create_date.day) + '-' + number_date(create_date.month) + '-' + create_date.year.to_s
  end

  private
  def news_params
    params.require(:news).permit(:headline, :byline, :author, :body, :picture_url)
  end

  def number_date(num)
    if num < 10
      return '0' + num.to_s
    end
    return num.to_s
  end
end
