from django.db import models
from django.urls import reverse
from django.utils import timezone
# from django.contrib.auth.models import User
from accounts.models import UserAccount
from django.utils.text import slugify


class Post(models.Model):
    author = models.ForeignKey(
        UserAccount, related_name='post_author', on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    content = models.TextField(max_length=100000)
    created_at = models.DateTimeField(default=timezone.now)
    image = models.ImageField(upload_to='blog/')
    category = models.ForeignKey('Category', related_name='post_category',
                                 on_delete=models.CASCADE)
    slug = models.SlugField(blank=True, null=True)
    actvie = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Post, self).save(*args, **kwargs)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("blog:post_detail", kwargs={"slug": self.slug})


class Category(models.Model):
    name = models.CharField(max_length=25)
    slug = models.SlugField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super(Category, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class Comment(models.Model):

    name = models.ForeignKey(
        UserAccount, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE,
                             related_name='comments', related_query_name='comment')
    content = models.TextField(max_length=1000)
    is_displayed = models.BooleanField(default=True)
    published_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Post - "{self.post.title}", "{self.body}"'
